from rest_framework import serializers
from table_data_app.models import TableData


class TableDataAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableData
        fields = ('id',
                  'city',
                  'start_date',
                  'end_date',
                  'price',
                  'status',
                  'color')
