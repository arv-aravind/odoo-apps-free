# -*- coding: utf-8 -*-
import ast
from urllib.parse import parse_qs, urlparse
from odoo import models, fields, api


class ArvStarRecords(models.Model):
    _name = 'arv.starred.records'

    datas = fields.Text('Datas')

    @api.model
    def get_records(self):
        data = ast.literal_eval(self.sudo().search([], limit=1).datas)
        return data

    @api.model
    def remove_records(self,key):
        starred_records = self.sudo().search([], limit=1)
        filtered_list = [item for item in ast.literal_eval(starred_records.datas) if key not in item.get('key_exists', '')]
        starred_records.write({'datas':filtered_list})
        return True

    @api.model
    def add_records(self, url):
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.fragment)
        model = query_params.get('model', [None])[0]
        record_id = query_params.get('id', [None])[0]
        if not record_id or not model:
            return False
        KeyFrame = str(model) + '_' + str(record_id)
        starred_records = self.sudo().search([], limit=1)
        current_record = self.env[str(model)].sudo().search([('id', '=', int(record_id))])
        data = ast.literal_eval(starred_records.datas)
        key_exists = any(KeyFrame in item.get('key_exists', '') for item in data)
        if not key_exists:
            data.append({'key_exists': KeyFrame, 'name': current_record.display_name, 'model': str(model),
                         'rec_id': int(record_id), 'url': url})
            starred_records.write({'datas': data})
        return current_record.display_name
