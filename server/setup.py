from setuptools import setup, find_packages

setup(
    name='spaceships',
    version='0.1.0',
    description='Setting up a python package',
    author='Omri Levy',
    author_email='omri2861@gmail.com',
    url='https://github.com/omri2861/Spaceships',
    packages=find_packages(include=['spaceships']),
    install_requires=[
        'flask',
        'python-dotenv',
        'pymongo',
        'eventlet'
    ],
    # package_data={'exampleproject': ['data/schema.json']}
)
