# Гайд по работе со сборкой

Для начала работы у вас должент быть установлен Node.js версии 18 и выше

## Активация husky

Для активации прекоммитных проверок с husky после установки зависимостей запустите команду (однократно)

`npm run prepare`

## 🚀 Структура проекта

Внутри проекта вы увидете следующие папки и файлы:

```text
/
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   ├── images/
│   └── svg/
├── src/
│   ├── assets/
|   |   ├── icons/
│   │   ├── images/
|   |   ├── styles/
│   │   |   ├── animations/
│   │   |   ├── base/
│   │   |   ├── layout/
│   │   |   └── index.scss
|   │   ├── scripts/
|   │   │   ├── api/
|   │   │   ├── build/
|   │   │   ├── components/
|   │   │   ├── core/
|   │   │   ├── utils/
|   │   │   └── Main.ts
|   │   │   └── ...
|   |   └── ...
│   ├── components/
|   |   ├── astro
|   |   |   ├── Container/
│   │   │   |   ├── Container.astro
│   │   │   |   └── Container.scss
│   │   |   └── ...
|   |   ├── vue
|   |   |   ├── Counter/
│   │   │   |   ├── Counter.vue
│   │   │   |   └── Counter.scss
│   │   |   └── ...
│   |   ├── ui/
│   │   |   ├── Button/
│   │   |   │   ├── Button.astro
│   │   |   │   └── Button.scss
│   │   |   └── ...
|   |   └── ...
│   ├── layouts/
│   │   ├── root/
│   │   │   └── root.astro
│   │   ├── Main/
│   │   │   └── Main.astro
│   │   └── ...
│   ├── pages/
│   │   ├── index.astro
│   │   └── sitemap.astro
│   └── ...
├── core/
|   ├── data/
|   ├── types/
└── package.json
```

Все статические файлы, например `svg` или шрифты, могут лежать в папке `public/`. Оттуда все файлы автоматически попадают в билд.

## 🐱‍💻 Команды

Все команды запускаются из корня проекта:

| Command                   | Action                                          |
| :------------------------ | :---------------------------------------------- |
| `npm install`             | Установить зависимости                          |
| `npm run prepare`         | Инициализировать husky pre-commit               |
| `npm run dev`             | Запустить локальный дев сервер `localhost:4321` |
| `npm run start`           | Запустить сервер c IP адресом `localhost:IP`    |
| `npm run build`           | Собрать билд для продакшна `./dist/`            |
| `npm run preview`         | Посмотреть билд локально перед деплоем          |
| `npm run astro -- --help` | Получить помощь в использовании Astro CLI       |
| `npm run lint`            | Запустить линтер с автоисправлениями            |
| `npm run gen:component`   | Утилита для создания шаблонного компонента      |
| `npm run images`          | Утилита для оптимизации изображений             |

## 🎴 Картинки

Есть два варианта для использования картинок:

### 1. Использовать компонент астро Picture. Он автоматически генерирует х1, х2, webp и avif. Автоматически подставляет ширину и высоту. [Документация](https://docs.astro.build/en/guides/images/)

Миксин генерирует все изображения из изначальной картинки (х1, х2, webp, avif)
нужно только изначально прокинуть картинку х2

Используйте по согласованию с бэком или если бэка нет.
Обязательно нужно указать ширину, чтобы правильно сгенерировались картинки х1.5

```Astro
---
import { Picture } from "astro:assets";
import myImage from "@images/my-image.jpg";
---

<Picture
  src={myImage}
  alt="example image"
  quality={"high"}
  formats={["webp"]}
  width={image.width / 2}
  height={image.height / 2}
  densities={[2]}
/>
```

**⚠️ Если вы используете исходные `png` картинки или преобразовываете через `fallbackFormat="png"` (а так же динамическое использование `fallbackFormat=myImage.format`)
делайте в компоненте проверку как ниже т.к. `squooshImageService` который используется в оптимизации картинок, не умеет оптимизировать png.**

```Astro
---
import myImagePng from "@images/my-image-png.png";
---

<Picture
  ...
  quality={myImage.format === "png" ? null : "high"}
  ...
/>
```

**Оптимизируйте `png` исходники вручную через [tinypng](https://tinypng.com/).**

## ♠️ Иконки

Все иконки должны быть в папке `src/assets/icons`.
Используйте компонент Icon, он вставляет svg инлайном на страницу.
Спрайт собирается автоматически при множественном использовании одной иконки на конкретной странице.

```Astro
---
import { Icon } from 'astro-icon/components'
---

<div class="icon">
  <Icon name="icon-close" />
</div>
```

Подробнее узнать можно [тут](https://www.npmjs.com/package/astro-icon).

Не используйте `<img>` для этого кейса, если нужно использовать `svg` в тэге `<img>`, добавляйте `svg` в папку `public/`.

## 📦 Слоты <slot>

Примеры использования можно посмотреть в [доке](https://docs.astro.build/en/core-concepts/astro-components/#slots), хотел лишь добавить что, если в вашем компоненте нужна проверка, принимает ли он слот или нет (например чтобы не генерировать лишнии пустые блоки которыми обернут слот) испрользуйте проверку 👇

```Astro
<div class="card">
  ...
  {Astro.slots.has("buttons") && (
    <div class="card__buttons">
      <slot name="buttons">
      </slot>
    </div>
  )}
  ...
</div>
```

Слоты можно прокидывать через промежуточные компоненты: [пример из доки](https://docs.astro.build/en/core-concepts/astro-components/#transferring-slots)

## 🧜 Полиморфные компоненты

В проекте есть полиморфные компоненты (Title, Button и т.д.) на основе пропса `as="..."`, в который нужно передать желаемый `html` тэг. Это позволяет указать TS чтобы он подтянул нативные пропсы(аттрибуты) сам исходя из переданного тэга. Вы так же вы можете расширить TS-тип добавив нужные вам пропсы `type Props<Tag extends HTMLTag> = Polymorphic<{as: Tag}> & { ..здесь ваши пропсы.. }`.

## 👀 Хотите узнать больше?

Посмотрите [документацию Astro](https://docs.astro.build).
