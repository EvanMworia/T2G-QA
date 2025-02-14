#Fibonacci Sequence Write a program to generate the Fibonacci sequence up to 100.

def fibonacci(stop_point):
    
    first= 0
    second = 1
    for i in range(stop_point):
        
        ans = first + second
        first = second
        second = ans
        print(ans)
    

fibonacci(100)