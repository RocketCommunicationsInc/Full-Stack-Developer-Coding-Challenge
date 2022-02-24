from django.contrib import admin

# Register your models here.
from .models import Contact, Alert
class ContactAdmin(admin.ModelAdmin):
    model = Contact

class AlertAdmin(admin.ModelAdmin):
    model = Alert

admin.site.register(Contact, ContactAdmin)
admin.site.register(Alert, AlertAdmin)
