from django.contrib import admin
from django.urls import path, include
from users.views import register, login, logout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('users/', include('users.urls')),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
]
