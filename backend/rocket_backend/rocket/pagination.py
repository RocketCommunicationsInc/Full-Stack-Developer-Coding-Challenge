from rest_framework import pagination
from rest_framework.response import Response
from rocket.models import Contact

class AdditionalPaginatedDetails(pagination.PageNumberPagination):
	def get_paginated_response(self, data):
		return Response({
			'links': {
				'next': self.get_next_link(),
				'previous': self.get_previous_link(),
			},
			'count': self.page.paginator.count,
			'results': data,
			'states': self.get_contact_state_counts(),
			'pages': self.page.paginator.num_pages,
			'current': self.request.query_params.get('page', None)
			})
	def get_contact_state_counts(self):
		return Contact.get_state_counts()
