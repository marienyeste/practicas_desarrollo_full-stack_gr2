Entrega práctica JSON - Desarrollo Full-Stack (GR2) - 
Mª Emilia Fernández López - 53147262N 
UserID: user5f7ecdcd5fe83
___________________________________________________________________________
 **JSON para elaborar la lista de la compra en diferentes supermercados**
___________________________________________________________________________
 Para cada supermercado se especifica:
    *ID del supermercado (id)
    *Nombre (nombre)
    *Direccion (direccion)
    *Coordenadas (coordenadas)
    *Productos (productos)
    *Ofertas (ofertas)
    *Productos habituales de consumo (habituales)

Para cada producto se especifica:
    *ID del producto (id)
    *Nombre (nombre)
    *Descripción del producto (descripcion)
    *Código de barras EAN-13 (barcode)
    *Nutri-Score (Nutri-Score)
    *Unidades (unidades)
    *Unidad de medida (unidad_medida)
    *Precio de venta (precioVta)
    *Moneda (moneda)
    *Si el producto ha sido adquirido o no (adquirido)

Para las ofertas de cada supermercado se especifica:
    *ID de la oferta (id)
    *ID del producto ofertado (producto_id) 🡲 hace referencia al id de cada producto
    *Descuento en % (descuento)
    *Periodo de vigencia de la oferta (periodo-vigencia)

___________________________________________________________________________
NOTA: los productos habituales de consumo de cada supermercado 
se agrupan en un array que hace referencia a la id de producto 
de cada producto.
 
NOTA2: las ofertas de cada supermercado se agrupan en un array
de objetos que contienen los detalles de cada oferta.
___________________________________________________________________________

