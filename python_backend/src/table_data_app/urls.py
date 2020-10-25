from django.conf.urls import url
from table_data_app import views

urlpatterns = [
    url(r'^api/table_data', views.table_data_list),
    url(r'^api/table_data/(?P<pk>[0-9]+)$', views.table_item_detail)
]
