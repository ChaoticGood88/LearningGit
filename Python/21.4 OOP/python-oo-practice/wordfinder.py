import random

class WordFinder:
    """Word Finder: finds random words from a dictionary."""
    
    def __init__(self, filename="words.txt"):
        """Initialize the WordFinder with the words file in the same directory."""
        self.words = self.read_words(filename)
        print(f"{len(self.words)} words read")

    def read_words(self, filename):
        """Read the words from the specified file and return a list of words."""
        with open(filename, 'r') as file:
            return [word.strip() for word in file.readlines()]

    def random(self):
        """Return a random word from the list of words."""
        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    """Special Word Finder: finds random words, excluding blank lines and comments."""
    
    def read_words(self, filename):
        """Read the words from the file, filtering out blank lines and comments."""
        with open(filename, 'r') as file:
            return [
                word.strip() for word in file.readlines()
                if word.strip() and not word.startswith('#')
            ]

# Example usage:
# To use WordFinder:
# wf = WordFinder("words.txt")
# print(wf.random())

# To use SpecialWordFinder:
# swf = SpecialWordFinder("words.txt")
# print(swf.random())
