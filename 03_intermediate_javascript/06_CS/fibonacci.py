def fibonacci_of(n):
    if n <= 1:
        return n
    
    return fibonacci_of(n-1) + fibonacci_of(n-2)


def fibs(n):
    return [ fibonacci_of(i) for i in range(n)]

print(fibs(8))