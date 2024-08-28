def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which are not vowels do not change position in the string, but all
    vowels (y is not a vowel) should reverse their order.

        >>> reverse_vowels("Hello!")
        'Holle!'

        >>> reverse_vowels("Tomatoes")
        'Temotaos'

        >>> reverse_vowels("Reverse Vowels In A String")
        'RivArsI Vewols en e Streng'

        >>> reverse_vowels("aeiou")
        'uoiea'

        >>> reverse_vowels("why try, shy fly?")
        'why try, shy fly?'
    """
    
    vowels = "aeiouAEIOU"
    s_list = list(s)  # Convert string to a list to modify it
    i, j = 0, len(s) - 1
    
    while i < j:
        # Move i forward if s[i] is not a vowel
        if s_list[i] not in vowels:
            i += 1
        # Move j backward if s[j] is not a vowel
        elif s_list[j] not in vowels:
            j -= 1
        else:
            # Swap vowels
            s_list[i], s_list[j] = s_list[j], s_list[i]
            i += 1
            j -= 1
    
    # Convert the list back to a string and return
    return ''.join(s_list)
