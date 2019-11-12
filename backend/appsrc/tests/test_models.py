from django.test import TestCase

from ..models import DzenUser


class TestUserModel(TestCase):
    """docstring for TestUserModel."""

    @classmethod
    def setUpTestData(self):
        DzenUser.objects.create(id=8, first_name = 'Test', last_name = 'User', password = 'bcrypt_sha256$$2b$12$Bi7qCDjwi6zB9E1fUd8ly.YvLq7L9NJm.CrCqirhx7pKTPiZaGEp2',
            email = 'testuser@gmail.com', is_active = True, username = "testUser")
    def setUp(self):
        self.user = DzenUser.objects.get(id=1)

    def tearDown(self):
        self.user.delete()

    def test_first_name_lable(self):
        field_label = self.user._meta.get_field('first_name').verbose_name
        self.assertEquals(field_label, 'first_name')

    def test_last_name_lable(self):
        field_label = self.user._meta.get_field('last_name').verbose_name
        self.assertEquals(field_label, 'last_name')

    def test_username_lable(self):
        field_label = self.user._meta.get_field('username').verbose_name
        self.assertEquals(field_label, 'username')

    def test_birth_date_lable(self):
        field_label = self.user._meta.get_field('birth_date').verbose_name
        self.assertEquals(field_label, 'birth_date')

    def test_first_name_max_length(self):
        max_length = self.user._meta.get_field('first_name').max_length
        self.assertEquals(max_length, 20)

    def test_last_name_max_length(self):
        max_length = self.user._meta.get_field('last_name').max_length
        self.assertEquals(max_length, 20)

    def test_username_max_length(self):
        max_length = self.user._meta.get_field('username').max_length
        self.assertEquals(max_length, 20)

    def test_object_name_is_first_name_last_name(self):
        expanded_obj_name = "%s %s" % (self.user.first_name, self.user.last_name)
        self.assertEquals(expanded_obj_name, str(user))
