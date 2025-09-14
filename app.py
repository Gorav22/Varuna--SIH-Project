import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Set webdriver-manager cache path to D:\
os.environ["WDM_LOCAL"] = "1"
os.environ["WDM_CACHE"] = "D:\\chromedriver_cache"

options = Options()
options.add_argument("--start-maximized")

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

driver.get("https://incois.gov.in/OON/index.jsp")
print("✅ Title:", driver.title)
driver.quit()
