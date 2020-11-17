from django.db import models


class contact(models.Model):
    _id = models.CharField(primary_key=True, max_length=24)
    contactid = models.CharField(max_length=36)
    contactstatus = models.CharField(max_length=8)
    contactname = models.IntegerField()
    contactground = models.CharField(max_length=8)
    contactsatellite = models.CharField(max_length=7)
    contactequipment = models.CharField(max_length=42)
    contactstate = models.CharField(max_length=9)
    contactstep = models.CharField(max_length=19)
    contactdetail = models.CharField(max_length=123)
    contactbegintimestamp = models.IntegerField()
    contactendtimestamp = models.IntegerField()
    contactlatitude = models.IntegerField()
    contactlongitude = models.IntegerField()
    contactazimuth = models.IntegerField()
    contactelevation = models.IntegerField()
    contactresolution = models.CharField(max_length=9)
    contactresolutionstatus = models.CharField(max_length=8)
        
    def __str__(self):
        return self.contactId




