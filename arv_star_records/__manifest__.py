# -*- coding: utf-8 -*-
{
    'name': 'Star Records | Starred Records | Favourite Records | Shortcut',
    'version': '16.0.1',
    'category': 'Services/Tools',
    'author': 'Aravind S',
    'support': 'aravindu28@gmail.com',
    'website': 'aravinds.odoo.com',
    'sequence': 1,
    'summary': """The "Star Records" module for Odoo enhances user experience by providing a convenient way to star
                    and access important records with ease.""",
    'description': """ The "Star Records" module for Odoo enhances user experience by providing a convenient way to star and access important records with ease. The module introduces a star icon in the navigation bar, allowing users to mark records as favorites. Starred records can be easily accessed through a systray menu, providing quick navigation to essential data.  """,
    'data': ['security/ir.model.access.csv', 'data/demo.xml'],
    'assets': {'web.assets_backend': ['arv_star_records/static/src/**/*']},
    'license': 'LGPL-3',
    # 'price': 10,
    # "currency": "USD",
    'application': True,
    'installable': True,
    'images': ['static/description/thumbnail.gif'],
}
