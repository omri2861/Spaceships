"""
This file contains some example functions used for the spaceships site
"""

import time

REFUEL_UNIT = 2
REFUEL_TIME = 0.2


def refuel(entity, gallons=0):
    print(f"Before refueling: {entity['data']['fuel']}")
    print(f"User requested: {gallons}")

    for _ in range(0, gallons, REFUEL_UNIT):
        print("Refuelling...")
        entity['data']['fuel'] += REFUEL_UNIT
        time.sleep(REFUEL_TIME)

    print(f"New fuel state: {entity['data']['fuel']}")

    return entity
