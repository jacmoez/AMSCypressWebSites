from faker import Faker
import faker

fake = Faker()
# Create fake data for an API request body (NO UI INVOLVED)
payload = {
    "name": fake.name(),
    "email": fake.email(),
    "address": fake.address()
}

print(payload)
print(fake.name())
print(fake.sentence())
print(fake.password())
print(fake.json())
print(fake.paragraphs())
print(fake.simple_profile())
print(fake.random_lowercase_letter())
print("------")
print(dir(fake))

print("------------------------")
for method_name in dir(fake):
    if not method_name.startswith('__'):
        print(method_name)