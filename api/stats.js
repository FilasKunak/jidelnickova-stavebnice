export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/usage_stats?select=*`, {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    const records = await response.json();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(todayStart.getDate() - todayStart.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const total = records.length;
    const uniqueUsers = new Set(records.map(r => r.user_id)).size;
    const today = records.filter(r => new Date(r.created_at) >= todayStart).length;
    const thisWeek = records.filter(r => new Date(r.created_at) >= weekStart).length;
    const thisMonth = records.filter(r => new Date(r.created_at) >= monthStart).length;

    const mealCounts = {};
    for (const r of records) {
      if (r.meal_type) {
        mealCounts[r.meal_type] = (mealCounts[r.meal_type] || 0) + 1;
      }
    }
    const topEntry = Object.entries(mealCounts).sort((a, b) => b[1] - a[1])[0];

    return res.status(200).json({
      total,
      unique_users: uniqueUsers,
      today,
      this_week: thisWeek,
      this_month: thisMonth,
      top_meal_type: topEntry ? { name: topEntry[0], count: topEntry[1] } : null
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
