def fix_entry(entry):
    """
    Due to how pymongo works, and to the difference between bson and json format, if you simply dump
    a database entry (e.g. a pymongo.find result), the '_id' field is poorly formatted (It is
    formatted as an object rather than a string). This function fix this format for the _id field,
    and other fields which contains object ids, if needed.
    :param entry: A single database entry (assumed dict or a child of dict).
    :return: The new, properly formatted entry
    """
    entry["id"] = str(entry["_id"])
    if 'source' in entry:
        entry["source"] = str(entry["source"])
    if 'target' in entry:
        entry["target"] = str(entry["target"])
    del entry["_id"]
    if "__v" in entry:
        del entry["__v"]
    return entry


def fix_entries(cursor):
    """
    Runs the fix_entry function on a pymongo cursor (search result). Or to put it simply, runs it
    as a generator.
    """
    for entry in cursor:
        yield fix_entry(entry)
