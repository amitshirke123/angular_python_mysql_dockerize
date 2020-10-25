from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from table_data_app.models import TableData
from table_data_app.serializers import TableDataAppSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def table_data_list(request):
    if request.method == 'GET':
        table_data = TableData.objects.all()

        city = request.GET.get('city', None)
        if city is not None:
            table_data = table_data.filter(city__icontains=city)

        table_data_serializer = TableDataAppSerializer(table_data, many=True)
        return JsonResponse(table_data_serializer.data, safe=False)

    elif request.method == 'POST':
        table_data = JSONParser().parse(request)
        table_data_serializer = TableDataAppSerializer(data=table_data)
        if table_data_serializer.is_valid():
            table_data_serializer.save()
            return JsonResponse(table_data_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(table_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def table_item_detail(request, pk):
    try:
        table_item = TableData.objects.get(pk=pk)
        if request.method == 'GET':
            table_data_serializer = TableDataAppSerializer(table_item)
            return JsonResponse(table_data_serializer.data)

        elif request.method == 'PUT':
            table_data = JSONParser().parse(request)
            table_data_serializer = TableDataAppSerializer(table_item, data=table_data)
            if table_data_serializer.is_valid():
                table_data_serializer.save()
                return JsonResponse(table_data_serializer.data)
            return JsonResponse(table_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            table_item.delete()
            return JsonResponse({'message': 'Item was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

    except TableData.DoesNotExist:
        return JsonResponse({'message': 'The item does not exist'}, status=status.HTTP_404_NOT_FOUND)



