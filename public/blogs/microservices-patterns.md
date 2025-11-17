# Essential Microservices Patterns Every Backend Engineer Should Know

Microservices architecture brings flexibility and scalability, but also complexity. Let's explore critical patterns that help manage this complexity.

## Pattern 1: API Gateway

The API Gateway pattern provides a single entry point for clients.

### Benefits

- **Simplified Client Code**: Single endpoint instead of multiple services
- **Cross-Cutting Concerns**: Authentication, rate limiting, logging
- **Protocol Translation**: HTTP to gRPC, REST to GraphQL

### Implementation Example

```javascript
// Express.js API Gateway
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use('/users', (req, res) => {
  proxy.web(req, res, { target: 'http://user-service:3001' });
});

app.use('/orders', (req, res) => {
  proxy.web(req, res, { target: 'http://order-service:3002' });
});

app.listen(8080);
```

## Pattern 2: Circuit Breaker

Prevent cascading failures by detecting and handling service failures gracefully.

### States

1. **Closed**: Normal operation, requests flow through
2. **Open**: Failures detected, requests fail immediately
3. **Half-Open**: Testing if service recovered

### Python Implementation

```python
import time
from enum import Enum

class CircuitState(Enum):
    CLOSED = 1
    OPEN = 2
    HALF_OPEN = 3

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise e
    
    def on_success(self):
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
```

## Pattern 3: Saga Pattern

Manage distributed transactions across multiple services.

### Choreography-Based Saga

```python
# Order Service publishes event
class OrderService:
    def create_order(self, order_data):
        order = self.save_order(order_data)
        self.event_bus.publish('OrderCreated', {
            'order_id': order.id,
            'user_id': order.user_id,
            'amount': order.total
        })
        return order

# Payment Service listens and responds
class PaymentService:
    def on_order_created(self, event):
        try:
            payment = self.process_payment(event['amount'])
            self.event_bus.publish('PaymentCompleted', {
                'order_id': event['order_id'],
                'payment_id': payment.id
            })
        except PaymentError:
            self.event_bus.publish('PaymentFailed', {
                'order_id': event['order_id'],
                'reason': 'Insufficient funds'
            })

# Order Service handles compensation
class OrderService:
    def on_payment_failed(self, event):
        self.cancel_order(event['order_id'])
```

## Pattern 4: Event Sourcing

Store state changes as a sequence of events.

### Example Implementation

```typescript
interface Event {
  type: string;
  timestamp: Date;
  data: any;
}

class EventStore {
  private events: Event[] = [];
  
  append(event: Event): void {
    this.events.push(event);
  }
  
  getEvents(aggregateId: string): Event[] {
    return this.events.filter(
      e => e.data.aggregateId === aggregateId
    );
  }
}

class BankAccount {
  private balance: number = 0;
  
  applyEvent(event: Event): void {
    switch(event.type) {
      case 'AccountCreated':
        this.balance = event.data.initialBalance;
        break;
      case 'MoneyDeposited':
        this.balance += event.data.amount;
        break;
      case 'MoneyWithdrawn':
        this.balance -= event.data.amount;
        break;
    }
  }
  
  reconstruct(events: Event[]): void {
    events.forEach(event => this.applyEvent(event));
  }
}
```

## Pattern 5: CQRS (Command Query Responsibility Segregation)

Separate read and write operations.

### Architecture

```go
package main

// Command side - optimized for writes
type CommandHandler struct {
    eventStore *EventStore
}

func (h *CommandHandler) CreateOrder(cmd CreateOrderCommand) error {
    event := OrderCreatedEvent{
        OrderID: generateID(),
        Items: cmd.Items,
        Total: calculateTotal(cmd.Items),
    }
    return h.eventStore.Append(event)
}

// Query side - optimized for reads
type QueryHandler struct {
    readDB *ReadDatabase
}

func (h *QueryHandler) GetOrder(orderID string) (*OrderDTO, error) {
    return h.readDB.FindOrder(orderID)
}

// Event handler updates read model
type EventHandler struct {
    readDB *ReadDatabase
}

func (h *EventHandler) OnOrderCreated(event OrderCreatedEvent) {
    h.readDB.InsertOrder(&OrderDTO{
        ID: event.OrderID,
        Items: event.Items,
        Total: event.Total,
        Status: "Pending",
    })
}
```

## Pattern 6: Service Mesh

Manage service-to-service communication.

### Istio Configuration Example

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - user-service
  http:
  - match:
    - headers:
        version:
          exact: v2
    route:
    - destination:
        host: user-service
        subset: v2
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10
```

## Pattern 7: Retry with Exponential Backoff

```python
import time
import random

def retry_with_backoff(func, max_retries=5, base_delay=1):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            
            delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
            print(f"Retry {attempt + 1}/{max_retries} after {delay:.2f}s")
            time.sleep(delay)
```

## Best Practices

### 1. Service Communication

- Use async messaging when possible
- Implement timeouts for all external calls
- Design for failure

### 2. Data Management

- Each service owns its data
- Use event-driven architecture for data consistency
- Implement compensating transactions

### 3. Observability

```python
import logging
import time
from functools import wraps

def trace(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start
            logging.info(f"{func.__name__} succeeded in {duration:.3f}s")
            return result
        except Exception as e:
            duration = time.time() - start
            logging.error(f"{func.__name__} failed in {duration:.3f}s: {e}")
            raise
    return wrapper
```

## Conclusion

These patterns are building blocks for robust microservices:

- **API Gateway**: Single entry point
- **Circuit Breaker**: Prevent cascading failures
- **Saga**: Distributed transactions
- **Event Sourcing**: Audit trail and temporal queries
- **CQRS**: Separate read/write optimization
- **Service Mesh**: Infrastructure-level concerns
- **Retry**: Handle transient failures

Choose patterns based on your specific requirements and constraints.
