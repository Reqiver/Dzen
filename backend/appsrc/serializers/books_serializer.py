from rest_framework import serializers

from ..models import Books


class TopBooksSerializator(serializers.ModelSerializer):
	"""Takes data from the Books model for Top Books component.
    Converts it to JSON format for transmission via the API.

    """

	class Meta:
		 model = Books

		 fields = ('bookname', 'status', 'cover_url', 'id',)
