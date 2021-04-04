class PermissiveDict(dict):
    """
    Dictionary class with loose rules for returning an
    attribute or a requested key value.  Note: may resort to iterating the dict values
    to find the matching requested key, so is potentially slow.

    Key is first directly found using the exact key, and then loose rules are used.

    Rules
    -----

    1. Compared without regard to case.
    2. Spaces, underscores, full-stops and dashes are equivalent in a requested_key.
    3. Requested key is converted to str and stripped for wild card searching.
    4. Items in the list can be retrieved by, get, attribute_access, call or array requested_key.
    5. First matching element is returned.
    6. Default of '' is used instead of dict standard None or raising KeyError

    Example:
    a = permissive_dict({'A': 1, 'A B': 2, 'b': 3, 4: 4})
    a.get('A_b') == a['a_b'] == a['A b'] == a['A_B'] a['a-b '] == a.a_b == a.A_b == a('a-b')

    Items with multiple wildcard keys may return the first item found.

    """
    __key_wildcards__ = [('', ''), ('_', ' '), (' ', '_'), (' ', '-'), ('-', ' '), (' ', '.'), ('.', ' ')]
    __split_char__ = ','

    def __init__(self, d=None, **kwargs):
        self.__default_returned__ = False
        self.__map_fields__ = {}
        if d is None:
            d = {}
        if kwargs:
            d.update(**kwargs)
        super().__init__(d)

    def __call__(self, key):
        return self.get(key)

    def __getattr__(self, name):
        try:
            value = super().__getattr__(name)
            return value
        except AttributeError:
            return self.get(name)

    def __getitem__(self, name):
        try:
            value = super().__getitem__(name)
            return value
        except KeyError:
            return self.get(name)

    def __setattr__(self, key, value):
        if key.startswith('__'):
            super().__setattr__(key, value)
        else:
            super().update({key: value})

    def __contains__(self, item):
        self.get(item)
        return not self.__default_returned__

    def get(self, key, default=''):
        """
        return the value in dict pd which matches the key
        using a str and upper comparision.  Tries normal get
        first.  Then a miscellany of common punctuation characters

        Use a comma to try a number of different keys for the same thing.

        :param key: key to find, converts to str
        :param default: default value if not found.  NOTE: unlike Python uses '' as the default
        :return: the value found or default if not found
        """
        self.__default_returned__ = False
        value = super().get(key)
        if value:
            return value

        for requested_key in [r.upper().strip() for r in str(key).split(self.__split_char__) if len(r) > 0]:
            if len(requested_key) > 0:
                for r in self.__key_wildcards__:
                    value = super().get(requested_key.replace(*r))
                    if value:
                        # print(f'short cut: {requested_key}')
                        return value

                    for k, v in self.items():
                        match_key = str(k).replace(*r).upper().strip()
                        if match_key == requested_key:
                            # print(f'iterated: {requested_key}')
                            return v

        return self.__get_map_value__(key, default)

    def all(self, key, keys=False):
        """
        return all values (or keys) that match the key(s) given

        :param key: {any} the key to search for
        :param keys: {bool} True to return keys instead of values
        :return: {list} all the items found
        """
        results = []
        for k, v in self.items():
            for requested_key in [r.upper().strip() for r in str(key).split(self.__split_char__) if len(r) > 0]:
                if len(requested_key) > 0:
                    for r in self.__key_wildcards__:
                        match_key = str(k).replace(*r).upper().strip()
                        if match_key == requested_key:
                            if keys:
                                results.append(k)
                            else:
                                results.append(v)
                            break
        return results

    @classmethod
    def convert_list(cls, items):
        """
        convert a normal list of dict into a PermissiveDict list
        NOTE: only dict type elements are appended to the result list

        :param items: list of dict
        :return: list of PermissiveDict
        """
        if not type(items) == list:
            raise ValueError('parameter items is not a list')

        result = []
        for item in items:
            t = type(item)
            if t == dict:
                p = PermissiveDict(item)
                result.append(p)
        return result

    def set_map(self, map_fields):
        self.__map_fields__ = map_fields

    def __get_map_value__(self, key, default):
        """
        return value using map keys to map multiple keys to a tight requested_key
        example:

        pd = permissive_dict(a=1, b=2, q=3,z=4)
        pd.set_map(dict(tree=['z','y','t']))
        pd.tree == 4
        :param key: item to match
        :return: the value
        """
        map_keys = self.__map_fields__.get(key)
        if not map_keys:
            self.__default_returned__ = True
            return default

        for k in map_keys:
            value = super().get(k, None)
            if value:
                return value

        self.__default_returned__ = True
        return default
