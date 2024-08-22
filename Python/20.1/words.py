# words.py

def print_upper_words(words, must_start_with={"e"}):
    """
    Prints each word from the list in uppercase on a separate line, 
    but only if the word starts with one of the specified letters.
    
    - words: list of words
    - must_start_with: set of letters that the words should start with (case-insensitive)
    """
    for word in words:
        if word[0].lower() in must_start_with:
            print(word.upper())

# Test the function
print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"})
