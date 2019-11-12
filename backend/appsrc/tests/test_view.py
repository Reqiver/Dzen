from django.test import TestCase

from ..models import DzenUser


lass TestUserLogin(TestCase):
    """docstring for TestUserLogin."""

    @classmethod
    def setUpTestData(self):
        DzenUser.objects.create(id=8, first_name = 'Test', last_name = 'User', password = '12test12',
            email = 'testuser@gmail.com', is_active = True, username = "testUser")
    def setUp(self):
        self.user = DzenUser.objects.get(id=1)

    def tearDown(self):
        self.user.delete()

    def test_correct(self):
        response = self.client.post('api/user/login/', {'email': 'testuser@gmail.com', 'password': '12test12'})
        self.assertTrue(response.data['token'])

    def test_wrong_username(self):
        response = self.client.post('api/user/login/', {'email': 'wrong', 'password': '12test12'})
        self.assertFalse(response.data['token'])

    def test_wrong_pssword(self):
        response = self.client.post('api/user/login/', {'email': 'test', 'password': 'wrong'})
        self.assertFalse(response.data['token'])
