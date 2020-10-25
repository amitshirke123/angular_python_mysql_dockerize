python manage.py makemigrations
python manage.py migrate --no-input
echo "from accounts.models import User; User.objects.filter(email='amit@gmail.com').exists() or User.objects.create_superuser('amit@gmail.com', 'Amit123!', 'Amit', 'Shirke')" | python manage.py shell
python manage.py runserver