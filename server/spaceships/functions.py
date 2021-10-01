"""
This file contains some example functions used for the spaceships site
"""

def refuel(entity, gallons=7000):
    entity["data"]["fuel"] += gallons
    return entity
