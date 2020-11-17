from django.db import models

class alerts(models.Model):
    errorid = models.CharField(primary_key=True, max_length=36)
    errorseverity = models.CharField(max_length=8)
    errorcategory = models.CharField(max_length=10)
    errormessage = models.CharField(max_length=38)
    longmessage = models.CharField(max_length=56)
    errortime = models.IntegerField()
    selected = models.CharField(max_length=5)
    new = models.CharField(max_length=5)
    expanded = models.CharField(max_length=5)
    
        
    def __str__(self):
        return self.errorid
