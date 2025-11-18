import pymysql
from pymysql.cursors import DictCursor

# 连接MySQL服务器(不指定数据库)
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='ShiuingPassword',
    port=3306,
    cursorclass=DictCursor
)

try:
    with connection.cursor() as cursor:
        # 创建数据库
        cursor.execute("CREATE DATABASE IF NOT EXISTS homespace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        print("数据库 'homespace' 创建成功！")
finally:
    connection.close()