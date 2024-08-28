def two_oldest_ages(ages):
    """Return two distinct oldest ages as tuple (second-oldest, oldest).

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """
    # Remove duplicates and sort in descending order
    distinct_ages = sorted(set(ages), reverse=True)
    
    # Check if there are at least two distinct ages
    if len(distinct_ages) < 2:
        raise ValueError("Not enough distinct ages to determine two oldest.")
    
    # Return the two oldest ages
    return (distinct_ages[1], distinct_ages[0])
