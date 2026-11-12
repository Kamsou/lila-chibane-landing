export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `# Lila Chibane · Coach sportive sport-santé

> Lila Chibane est coach sportive sport-santé, basée à Avensan, dans le Médoc (Gironde, Nouvelle-Aquitaine, France). Elle accompagne des femmes qui veulent reprendre une activité physique à leur rythme, sans pression ni culpabilité. Elle est aussi fondatrice des Tortues du Médoc et autrice de la newsletter Corps de rêves.

## Identité

- Nom : Lila Chibane
- Métier : coach sportive sport-santé, diplômée en sport santé, certifiée en nutrition
- Fondatrice des Tortues du Médoc : https://lestortuesdumedoc.fr/
- Basée à : Avensan, Médoc, Gironde (33480), France
- Site : https://lilachibane.com
- Contact : lila.chibane.pro@outlook.com
- Newsletter Corps de rêves (sport, santé des femmes et sciences, chaque dimanche) : https://corpsdereves.substack.com/
- Langue : français

## Public

- Femmes actives, 30-55 ans
- Reprise d'une activité physique après une longue pause
- Fatigue, stress, charge mentale, planning chargé
- En quête d'un accompagnement bienveillant, sans pression

## Approche

1. **Activité physique adaptée** : renforcement, mobilité, cardio dosé, ajustés au niveau et aux contraintes de chacune.
2. **Régulation nerveuse** : gestion du stress, respiration, conscience du corps.
3. **Alimentation soutenante** : des repères pour l'énergie et la récupération, sans régime ni restriction.

Valeurs : à ton rythme, le plaisir avant la performance, la régularité avant l'intensité, zéro culpabilité. L'objectif est l'autonomie : un coaching conçu pour qu'on n'en ait plus besoin.

## Accompagnements

### Les tortues libres et musclées (cohorte en ligne)

- 12 semaines en ligne, en petit groupe de 6 femmes
- Un live par semaine, trois vidéos par semaine (36 vidéos à garder)
- Un groupe WhatsApp et 3 appels individuels avec Lila
- En semaine 12, chaque participante conçoit sa propre séance
- Tarif de la première cohorte : 650 € (800 € pour la cohorte d'avril)
- Inscription sur liste d'attente : https://lilachibane.com/cohorte

### Allô Lila (appel individuel)

- Un appel de 45 minutes en visio, en tête-à-tête
- Un court questionnaire avant, un récap écrit après l'appel
- Pour repérer ce qui coince et repartir avec un plan pour les semaines qui arrivent
- Tarif : 85 €
- Détails : https://lilachibane.com/allo-lila

## Pages du site

- https://lilachibane.com : accueil (présentation, accompagnements, approche, newsletter, témoignages, contact)
- https://lilachibane.com/cohorte : la cohorte en ligne de 12 semaines
- https://lilachibane.com/allo-lila : l'appel individuel de 45 minutes
- https://lilachibane.com/blog : articles sur le corps des femmes, le sport et la santé
`
})
