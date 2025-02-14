#Power of Two Write a program that takes an integer as input and returns true if
#the input is a power of two. Examples: 8=> returns true 6=> returns false
def power_of_two(input):
    
    while input > 1:
        if input % 2 != 0:
            return False
        input = input / 2
    print("True")
    return True
    
print(power_of_two(8))
