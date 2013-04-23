#define my assets here
from django_assets import Bundle, register
from webassets.filter import get_filter

all_css = Bundle('css/_recipe.scss',
              filters=(get_filter('scss', debug_info=False), 'cssmin'),
              output='css/recipe-min.css')

register('css_all', all_css)

js = Bundle('js/recipe.js',
            filters='jsmin',
            output='js/recipe-min.js')
register('js_all', js)
