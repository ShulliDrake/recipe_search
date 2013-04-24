from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

from search.views import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'recipe_search.views.home', name='home'),
    # url(r'^recipe_search/', include('recipe_search.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    url(r'^$', 'search.views.search'),
    url(r'^api$', 'search.views.api')
)
