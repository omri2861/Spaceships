"""
This file contains some example functions used for the spaceships site
"""

import time

from spaceships.blueprints.run import ProgressBar

REFUEL_UNIT = 2
REFUEL_TIME = 0.2


def refuel(entity, pbar: ProgressBar, gallons=1):
    print(f"Before refueling: {entity['data']['fuel']}")
    print(f"User requested: {gallons}")

    pbar.set_total(gallons)

    for _ in range(0, gallons, REFUEL_UNIT):
        print("Refuelling...")
        entity['data']['fuel'] += REFUEL_UNIT
        pbar.update(REFUEL_UNIT)
        time.sleep(REFUEL_TIME)
    
    final_refuel = gallons % REFUEL_UNIT
    # TODO: Fix this stupid bug
    if final_refuel != 0:
        entity['data']['fuel'] += final_refuel
        pbar.update(final_refuel)

    print(f"New fuel state: {entity['data']['fuel']}")

    return entity
