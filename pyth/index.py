import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.get("https://jacmoez.github.io/AMSCypressWebSites/online_shop/index.html")
    yield driver
    driver.quit()

def test_home_page_elements(driver):
    # Check title
    assert "Online Shop" in driver.title

    # Hero section
    hero = driver.find_element(By.CLASS_NAME, "hero")
    assert "Welcome" in hero.text
    cta_button = hero.find_element(By.TAG_NAME, "button")
    assert cta_button.is_displayed()

    # Featured products
    featured = driver.find_elements(By.CLASS_NAME, "featured-item")
    assert len(featured) == 4

def test_home_page_navigation(driver):
    nav_links = {
        "Categories": "categories.html",
        "Products": "products.html",
        "Deals": "deals.html",
        "About": "about.html",
        "Cart": "cart.html"
    }

    for link_text, expected_url in nav_links.items():
        link = driver.find_element(By.LINK_TEXT, link_text)
        link.click()
        assert expected_url in driver.current_url
        driver.back()

def test_featured_product_add_to_cart(driver):
    product = driver.find_element(By.CSS_SELECTOR, ".featured-item .btn")
    product_name = driver.find_element(By.CSS_SELECTOR, ".featured-item .card-title").text
    product.click()

    alert = driver.find_element(By.CLASS_NAME, "alert-success")
    assert product_name in alert.text

    cart_count = driver.find_element(By.ID, "cart-count")
    assert int(cart_count.text) >= 1

def test_category_cards(driver):
    category_cards = driver.find_elements(By.CLASS_NAME, "category-card")
    assert len(category_cards) == 4

    expected_categories = ["Electronics", "Clothing", "Home & Kitchen", "Accessories"]
    found = []

    for card in category_cards:
        title = card.find_element(By.CLASS_NAME, "card-title").text
        found.append(title)
        assert "Shop Now" in card.text

    for expected in expected_categories:
        assert expected in found

def test_category_navigation(driver):
    category_cards = driver.find_elements(By.CLASS_NAME, "category-card")
    for card in category_cards:
        title = card.find_element(By.CLASS_NAME, "card-title").text
        button = card.find_element(By.TAG_NAME, "button")
        button.click()
        assert "products.html?category=" in driver.current_url
        assert title.lower().split()[0] in driver.current_url
        driver.back()
