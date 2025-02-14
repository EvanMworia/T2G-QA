"""
4. Write a program that picks a random integer from 1 to 100, and has players
guess the number. The rules are:
• If a player's guess is less than 1 or greater than 100, say "OUT OF BOUNDS"
• On a player's first turn, if their guess is
• within 10 of the number, return "WARM!"
• further than 10 away from the number, return "COLD!"
• On all subsequent turns, if a guess is
• closer to the number than the previous guess return "WARMER!"
• farther from the number than the previous guess, return "COLDER!"
• When the player's guess equals the number, tell them they've guessed correctly
and how many guesses it took!
"""
import random 


number = random.randint(1,100)
while True:
    try:
        print(number)
        userGuess = int(input("Pick a number between 1 and 100: "))
        if userGuess < 1 or userGuess > 100:
            print("OUT OF BOUNDS")
        else:
            print("nice")
            break
        
    except ValueError:
        print("Guess must be an integer")