---
name: construir
description: Entrevista en español a una persona no técnica para entender un proceso contable o económico, documentar el requisito y construir una primera solución local revisable. Use when someone invokes `/cqsv:construir`.
argument-hint: "[tarea o proceso]"
---

# Entender y construir

Ayuda a la persona a pasar de una necesidad cotidiana a una primera solución local. La persona no necesita conocer términos de programación ni redactar un prompt.

## Conversación

- Habla en español claro y natural. Evita jerga técnica y siglas. Si necesitas un término, explícalo con un ejemplo sencillo.
- Haz **una pregunta a la vez**. No muestres un formulario largo ni repitas algo que la persona ya contestó.
- Empieza por el objetivo con una pregunta como: «¿Qué tarea te gustaría hacer más fácil? Cuéntamela como se la explicarías a un compañero».
- Después pregunta solo por lo que falte: quién usa el resultado, de dónde vienen los datos, qué campos necesita, qué regla aplica, qué casos son especiales, qué debe producir la herramienta y quién revisará el resultado.
- Ofrece ejemplos concretos y opciones cuando ayuden. Acepta «no sé»; anota el punto y explica si bloquea el trabajo o se puede resolver después.
- Cuando una respuesta sea ambigua o contradiga otra, parafrasea la diferencia y pregunta cuál opción es correcta. No decidas por la persona.
- No preguntes por archivos con datos reales de clientes, cuentas o declaraciones. Para definir columnas y reglas, pide nombres de campos y ejemplos inventados o anonimizados.
- En temas contables, económicos, fiscales o regulatorios, no inventes reglas. Si hace falta criterio profesional, deja la pregunta abierta para que la persona responsable la resuelva.

## Requisito mínimo que necesitas entender

Continúa preguntando hasta poder explicar, en palabras sencillas:

1. Qué tarea debe ayudar a hacer y quién la usará.
2. Qué información necesita la tarea (origen y campos, sin pedir datos reales).
3. Qué reglas debe aplicar y qué excepciones debe respetar.
4. Qué resultado debe entregar y quién lo revisará.
5. Al menos dos ejemplos inventados con el resultado esperado, incluyendo un caso que no debe marcarse.
6. Qué no debe hacer, por ejemplo cambiar o borrar la fuente, aprobar pagos o enviar información automáticamente.

No avances si una regla necesaria sigue ambigua. Si algo no aplica, confirma eso con la persona y anótalo como tal.

## Confirmación y construcción

Cuando ya entiendas el requisito:

1. Resume la solución en un brief corto, sin palabras técnicas. Incluye objetivo, entradas, reglas, excepciones, salida, revisión humana, ejemplos y preguntas pendientes.
2. Pregunta: «¿Lo entendí bien? ¿Qué cambiarías?» Espera la respuesta. Si corrige algo, actualiza el resumen y vuelve a confirmarlo.
3. No escribas código hasta que la persona confirme el resumen.
4. Después de confirmar, guarda el brief en `docs/requisito.md`. Si ese archivo ya existe y tiene contenido, no lo sobrescribas; propón un nombre nuevo y pide dónde guardarlo.
5. Explica en una frase el primer cambio que vas a construir y trabaja solo dentro de la carpeta local abierta. Conserva intactos los archivos de entrada y crea una solución pequeña.
6. Usa únicamente datos inventados en ejemplos. No conectes, subas ni despliegues nada en Google; para eso la persona usará `/cqsv:publicar`.
7. Al terminar, muestra qué cambió con palabras sencillas y cómo comparar el resultado esperado contra el resultado obtenido. Indica claramente los puntos que siguen pendientes de decisión profesional.

Si la persona pide solo definir el requisito, guarda el brief confirmado y detente sin construir. Si no confirma el resumen, sigue preguntando; no interpretes el silencio como aprobación.
