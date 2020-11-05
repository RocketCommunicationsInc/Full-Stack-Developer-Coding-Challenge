import requests

BASE = "http://127.0.0.1:5000/"

login_response = requests.post(BASE + "login", {"email": "joelness@msn.com", "password": "12345" })
print(login_response.json())
input()
contacts_response = requests.get(BASE + "contacts", {"token": login_response["access_token"] })
print(contacts_response.json())
