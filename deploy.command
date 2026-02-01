#!/bin/bash
# Деплой veronika-website на Cloudflare Pages
# Просто дважды кликни на этот файл!

cd "$(dirname "$0")"

echo "🚀 Деплой veronika-website..."
echo ""
echo "📦 Сборка проекта..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "☁️  Деплой на Cloudflare Pages..."
    npx wrangler pages deploy out --project-name=veronika-website --commit-dirty=true

    echo ""
    echo "✅ Готово! Сайт доступен по адресу:"
    echo "   https://veronika-website.pages.dev"
else
    echo ""
    echo "❌ Ошибка сборки"
fi

echo ""
read -p "Нажми Enter чтобы закрыть..."
