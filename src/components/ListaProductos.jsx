function ListaProductos() {
  const productos = [
    { id: 1, nombre: 'Laptop Pro 15"',    precio: 1299.99, disponible: true  },
    { id: 2, nombre: 'Monitor Curvo 27"', precio: 429.00,  disponible: true  },
    { id: 3, nombre: 'Teclado Mecánico',  precio: 89.50,   disponible: false },
    { id: 4, nombre: 'Ratón Inalámbrico', precio: 45.99,   disponible: true  },
    { id: 5, nombre: 'Auriculares BT',    precio: 159.00,  disponible: false },
  ]

  return (
    <div className="card" style={{ maxWidth: 580 }}>
      <h3 style={{ fontSize: 16, marginBottom: 16 }}>Catálogo de productos</h3>
      <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '0.5px solid var(--border)' }}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td style={{ fontWeight: 500 }}>{producto.nombre}</td>
                <td style={{ fontWeight: 600, color: 'var(--accent-purple)' }}>
                  ${producto.precio.toFixed(2)}
                </td>
                <td>
                  <span className="badge" style={{
                    background: producto.disponible ? 'var(--pastel-mint)' : 'var(--pastel-peach)',
                    color: producto.disponible ? 'var(--accent-teal)' : 'var(--accent-coral)',
                  }}>
                    {producto.disponible ? '● Disponible' : '● Agotado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaProductos