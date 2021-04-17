import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from utils import get_data_from_config, get_template
from constants import USER, PASSWORD, SERVER, TEMPLATE


def send_mail(item):
    config = get_data_from_config()
    user = config[USER]
    smtpObj = smtplib.SMTP(config[SERVER])
    smtpObj.ehlo()
    smtpObj.starttls()
    smtpObj.login(user, config[PASSWORD])
    html = get_template(f'./web/templates/{item[TEMPLATE]}', item)
    msg = MIMEMultipart('alternative')
    msg.attach(MIMEText(html, 'html'))
    msg['Subject'] = 'Subject'
    msg['From'] = user
    # https://tempail.com/ru/ - copy temp mail and test
    smtpObj.sendmail(user, item['email'], msg.as_string())
    smtpObj.quit()
