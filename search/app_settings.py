#recipe search app settings
#imported into settings.py

#Yummly API
#Documentation: https://developer.yummly.com/documentation
API_ID = "694716e4"
API_KEY = "a205ae28f8388e43646bab3e0446a3a7"

#Search recipe API
API_URL = "http://api.yummly.com/v1/api/recipes?_app_id=694716e4&_app_key=a205ae28f8388e43646bab3e0446a3a7&requirePictures=true&q=%s"
ALLOWED_CUISINE_PARAM = "&allowedCuisine[]=cuisine^cuisine-%s"

#Get recipe API
RECIPE_API_URL = "http://api.yummly.com/v1/api/recipe/%s?_app_id=%s&_app_key=%s"

CUISINE_LIST = [
    "American",
    "Asian",
    "Cajun",
    "Chinese",
    "French",
    "Greek",
    "Hawaiian",
    "Italian",
    "Japanese",
    "Mediterranean",
    "Mexican",
    "Southern",
    "Thai",
    ]

DISH_LIST = [
    "Apple Pie",
    "Chocolate Cake",
    "Curry",
    "Casserole",
    "Fried Rice",
    "Irish Coffee",
    "Jambalaya",
    "Omelette",
    "Leek Soup",
    "Mashed Potatoes",
    "Cinnamon Rolls",
    "Pasta Salad",
    "Stuffed Mushroom",
    "Orange Chicken",
    "Barbecue Chicken",
    "Gratin",
    "Lasagna",
    "Pork Chops",
    "Avocado",
    "Broccoli",
    "Tofu",
]
