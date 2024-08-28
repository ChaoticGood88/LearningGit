def multiply_even_numbers(nums):
    """Multiply the even numbers.
    
        >>> multiply_even_numbers([2, 3, 4, 5, 6])
        48
        
        >>> multiply_even_numbers([3, 4, 5])
        4
        
    If there are no even numbers, return 1.
    
        >>> multiply_even_numbers([1, 3, 5])
        1
    """
    # Initialize the product to 1
    product = 1
    
    # Track if we have any even numbers
    has_even = False
    
    # Iterate over the list
    for num in nums:
        # Check if the number is even
        if num % 2 == 0:
            product *= num
            has_even = True
    
    # If no even numbers were found, return 1
    if not has_even:
        return 1
    
    return product
