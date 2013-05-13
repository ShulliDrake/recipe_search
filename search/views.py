from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

import requests
import simplejson


def search(request):

    return render_to_response("home.html",
                              {"dish_list":settings.DISH_LIST,
                               "cuisine_list":settings.CUISINE_LIST},
                              context_instance=RequestContext(request))


def api(request):
    """
    Recipe Search API
    Make API call and return JSON response
    """

    keywords = request.GET.get('q', '')

    api_url_base = settings.API_URL
    api_url = api_url_base % keywords

    #check cuisine
    if request.GET.get('cuisine'):
        api_cuisine_base = settings.ALLOWED_CUISINE_PARAM
        cuisine = (api_cuisine_base % request.GET.get('cuisine'))
        api_url += cuisine

    r = requests.get(api_url)

    print api_url

    recipes = r.json().get("matches")

    response = {"results": recipes,
                "totalCount": r.json().get("totalMatchCount")}

    return HttpResponse(simplejson.dumps(response), mimetype="application/json")


def recipe_api(request):
    """
    Get Recipe API
    """

    recipe_id = request.GET.get("id")
    api_id = settings.API_ID
    api_key = settings.API_KEY
    api_url_base = settings.RECIPE_API_URL

    r = requests.get(api_url_base % (recipe_id, api_id, api_key))

    response = r.json()

    return HttpResponse(simplejson.dumps(response), mimetype="application/json")
