import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useGetList } from "react-admin";

const Dashboard = () => {
  const { total: totalUsers, isLoading: loadingU } = useGetList("users");

  // ================= KPI CARD =================
  const StatCard = ({ title, value, loading, color }: any) => (
    <Card
      sx={{ borderRadius: 3, boxShadow: 3, borderLeft: `6px solid ${color}` }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Box mt={1}>
          <Typography variant="h4" sx={{ color }}>
            {loading ? "..." : value ?? 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // ================= PIE DATA =================

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Users"
            value={totalUsers ?? 0}
            loading={loadingU}
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
