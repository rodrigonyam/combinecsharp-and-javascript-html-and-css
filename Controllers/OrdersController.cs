using Microsoft.AspNetCore.Mvc;
using RetailWebsite.Models;

namespace RetailWebsite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private static List<Order> orders = new List<Order>();
        private static int nextOrderId = 1;

        [HttpPost]
        public ActionResult<Order> CreateOrder([FromBody] Order order)
        {
            if (order == null || order.Items == null || !order.Items.Any())
            {
                return BadRequest("Invalid order data");
            }

            order.Id = nextOrderId++;
            order.OrderDate = DateTime.Now;
            order.Status = "Confirmed";
            order.TotalAmount = order.Items.Sum(item => item.Price * item.Quantity);

            orders.Add(order);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpGet("{id}")]
        public ActionResult<Order> GetOrder(int id)
        {
            var order = orders.FirstOrDefault(o => o.Id == id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrders()
        {
            return Ok(orders.OrderByDescending(o => o.OrderDate));
        }
    }
}
