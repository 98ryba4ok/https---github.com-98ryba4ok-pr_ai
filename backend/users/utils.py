import re
import time
import random
from django.contrib.auth import get_user_model # type: ignore

User = get_user_model()

# временное хранилище кодов
verification_codes = {}

def validate_registration_data(email, name, password):
    """Проверка данных при регистрации"""
    if any(char.isdigit() for char in name):
        return "Имя не должно содержать цифры"

    if len(password) < 8:
        return "Пароль должен содержать не менее 8 символов"

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return "Некорректный формат email"

    if User.objects.filter(email=email).exists():
        return "Пользователь с таким email уже зарегистрирован"

    return None
