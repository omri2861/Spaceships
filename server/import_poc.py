
import importlib


def get_function_from_import_string(import_string):
    module_name = import_string[:import_string.rindex(".")]

    func_name = import_string.split(".")[-1]
    print(f"mod: {module_name}\nfunc: {func_name}")

    module = importlib.import_module(module_name)
    return getattr(module, func_name)


def main():
    refuel = get_function_from_import_string("spaceships.functions.refuel")

    entity = {"data": {"fuel": 111}}
    print(f"Entity before running:\n{entity}")
    
    result = refuel(entity)
    print(f"Entity before running:\n{result}")

if __name__ == "__main__":
    main()
