"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [(0, 0, 0, 2), (0, 10, 0, 1)],
            "answer": 10,
        },
        {
            "input": [(10, 10, -1, 0), (0, 1, 0, 1)],
            "answer": None,
        },
        {
            "input": [(620775675217287, -1862327025651882, -3, 9), (413850450144856, 2069252250724307, -2, -10)],
            "answer": 206925225072431,
        },
    ],
    "Extra": [
        {
            "input": [(0, -7, 1, -1), (-9, -16, 4, 2)],
            "answer": 3,
        },
        {
            "input": [(-28, 9, 9, -4), (-26, -5, 8, -2)],
            "answer": None,
        },
        {
            "input": [(-28, -6, 5, 1), (-56, -55, 9, 8)],
            "answer": 7,
        },
    ]
}
