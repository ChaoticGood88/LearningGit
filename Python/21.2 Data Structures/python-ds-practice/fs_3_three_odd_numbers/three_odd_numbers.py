def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?

    Returns True if the sum of any three sequential numbers in the list is odd,
    otherwise returns False.

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    
    # Iterate over the list, considering every set of 3 consecutive numbers
    for i in range(len(nums) - 2):
        # Calculate the sum of the current triplet
        triplet_sum = nums[i] + nums[i + 1] + nums[i + 2]
        
        # Check if the sum is odd
        if triplet_sum % 2 != 0:
            return True
    
    # If no odd sum is found, return False
    return False
