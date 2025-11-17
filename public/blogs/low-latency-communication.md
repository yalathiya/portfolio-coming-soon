# Achieving Low Latency in Distributed Systems

Building systems that respond in microseconds requires understanding every layer of the stack. Let's explore techniques for achieving ultra-low latency communication.

## Understanding Latency

Latency is the time delay between cause and effect. In distributed systems, we care about:

- **Network Latency**: Time for data to travel between nodes
- **Processing Latency**: Time to process requests
- **Queueing Latency**: Time spent waiting in queues

## TCP Optimization Techniques

### 1. TCP_NODELAY

Disable Nagle's algorithm to send packets immediately:

```python
import socket

# Python example
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
```

### 2. Socket Buffer Tuning

```bash
# Linux kernel parameters
sudo sysctl -w net.core.rmem_max=16777216
sudo sysctl -w net.core.wmem_max=16777216
sudo sysctl -w net.ipv4.tcp_rmem='4096 87380 16777216'
sudo sysctl -w net.ipv4.tcp_wmem='4096 65536 16777216'
```

### 3. Connection Pooling

```javascript
// Connection pool configuration
const pool = {
  min: 10,
  max: 100,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  keepAlive: true,
  keepAliveInitialDelay: 10000
};
```

## Zero-Copy Techniques

Zero-copy reduces CPU overhead by eliminating data copies between kernel and user space.

### Using sendfile()

```c
#include <sys/sendfile.h>

// Send file without copying to user space
off_t offset = 0;
ssize_t sent = sendfile(out_fd, in_fd, &offset, file_size);
```

## Memory-Mapped I/O

```cpp
#include <sys/mman.h>

void* mapped = mmap(NULL, file_size, 
                    PROT_READ, MAP_SHARED, 
                    fd, 0);
// Direct memory access - no read() syscall
```

## CPU Affinity and Thread Pinning

```go
package main

import (
    "runtime"
    "syscall"
)

func pinThread(cpu int) {
    runtime.LockOSThread()
    var cpuset syscall.CPUSet
    cpuset.Set(cpu)
    syscall.SchedSetaffinity(0, &cpuset)
}
```

## Lock-Free Data Structures

Using atomic operations instead of locks:

```rust
use std::sync::atomic::{AtomicU64, Ordering};

struct Counter {
    count: AtomicU64,
}

impl Counter {
    fn increment(&self) {
        self.count.fetch_add(1, Ordering::Relaxed);
    }
}
```

## Batching Strategies

### Micro-batching

```python
import asyncio
from typing import List

class MicroBatcher:
    def __init__(self, max_size=100, max_wait_ms=10):
        self.batch = []
        self.max_size = max_size
        self.max_wait = max_wait_ms / 1000
        
    async def add(self, item):
        self.batch.append(item)
        if len(self.batch) >= self.max_size:
            await self.flush()
        
    async def flush(self):
        if self.batch:
            await self.process_batch(self.batch)
            self.batch = []
```

## Network Protocol Selection

### UDP for Ultra-Low Latency

```python
import socket

# UDP server
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('0.0.0.0', 9999))

while True:
    data, addr = sock.recvfrom(1024)
    # Process data with minimal overhead
```

### When to Use UDP:

- Can tolerate packet loss
- Need lowest possible latency
- Real-time applications (gaming, video streaming)
- High-frequency trading systems

## Monitoring Latency

### Percentile-Based Monitoring

```python
import numpy as np

latencies = [1.2, 1.5, 1.3, 2.1, 1.4, 50.0, 1.6]

p50 = np.percentile(latencies, 50)
p99 = np.percentile(latencies, 99)
p999 = np.percentile(latencies, 99.9)

print(f"p50: {p50}ms, p99: {p99}ms, p99.9: {p999}ms")
```

## Best Practices

1. **Measure Everything**: Use high-resolution timers
2. **Avoid GC Pauses**: Use manual memory management or pooling
3. **Minimize Syscalls**: Batch operations when possible
4. **Use Appropriate Data Structures**: Lock-free when possible
5. **Profile Continuously**: Find and eliminate bottlenecks

## Real-World Example

Here's a minimal low-latency server in Go:

```go
package main

import (
    "net"
    "runtime"
)

func main() {
    runtime.GOMAXPROCS(runtime.NumCPU())
    
    ln, _ := net.Listen("tcp", ":8080")
    
    for {
        conn, _ := ln.Accept()
        go handleConnection(conn)
    }
}

func handleConnection(conn net.Conn) {
    defer conn.Close()
    
    // Set TCP_NODELAY
    tcpConn := conn.(*net.TCPConn)
    tcpConn.SetNoDelay(true)
    
    buffer := make([]byte, 4096)
    for {
        n, err := conn.Read(buffer)
        if err != nil {
            return
        }
        
        // Process and respond immediately
        conn.Write(buffer[:n])
    }
}
```

## Conclusion

Achieving low latency requires attention to detail at every layer:

- Network configuration and protocols
- Operating system tuning
- Application-level optimizations
- Careful monitoring and profiling

The key is to understand your specific requirements and optimize accordingly.
